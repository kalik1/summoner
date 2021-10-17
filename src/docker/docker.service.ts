import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';
import * as Dockerode from 'dockerode';
import { ContainerInfo, ImageInfo } from 'dockerode';
import { IncomingMessage } from 'http';
import * as util from 'util';
import { ServerEntity } from '../api/server/entities/server.entity';
import { InstanceEntity } from '../api/instances/entities/instance.entity';

interface DockerInstance {
  InstanceName: string;
  client: Docker
}

@Injectable()
export class DockerService {
  dockers: DockerInstance[] = [];

  private getInstanceFromName(InstanceName: string): Docker {
    return this.dockers.find((d) => d.InstanceName === InstanceName).client;
  }

  findOrphanByName(InstanceName: string, name: string) {
    return this.getInstanceFromName(InstanceName).getContainer(name);
  }

  StartContainer(InstanceName: string, containerId: string): Promise<unknown> {
    const container = this.getInstanceFromName(InstanceName)
      .getContainer(containerId);
    // containers.attach({ stream: true, stdout: true, stderr: true }, (err, stream) => {
    //   if (err) throw new Error(err);
    //   stream.pipe(process.stdout);
    // });
    return container.start();
  }

  StopContainer(InstanceName: string, containerId: string): Promise<unknown> {
    return this.getInstanceFromName(InstanceName)
      .getContainer(containerId)
      .stop();
  }

  async GetContainerState(InstanceName: string, containerId: string): Promise<Dockerode.ContainerInspectInfo['State']> {
    const container = this.getInstanceFromName(InstanceName)
      .getContainer(containerId);
    return (await container.inspect({})).State;
  }

  async InspectContainer(InstanceName: string, containerId: string): Promise<Dockerode.ContainerInspectInfo> {
    const container = this.getInstanceFromName(InstanceName)
      .getContainer(containerId);
    return container.inspect({});
  }

  async ContainerStats(InstanceName: string, containerId: string): Promise<Dockerode.ContainerStats> {
    const container = this.getInstanceFromName(InstanceName)
      .getContainer(containerId);
    return container.stats({});
  }

  private getClientFromInstance(instance: InstanceEntity):DockerInstance {
    const instanceName: string = instance.id;
    return this.GetOrStartClient(instanceName, {
      protocol: instance.protocol,
      host: instance.host,
      port: instance.port,
    });
  }

  async getContainers(instance: InstanceEntity): Promise<ContainerInfo[]> {
    return this.getClientFromInstance(instance).client.listContainers();
  }

  async getImages(instance: InstanceEntity): Promise<ImageInfo[]> {
    return this.getClientFromInstance(instance).client.listImages();
  }

  async getUsedHostPorts(instance: InstanceEntity): Promise<string[]> {
    const containers = await this.getContainers(instance);
    return containers
      .reduce((ports: string[], container) => [
        ...ports,
        ...container.Ports
          .filter((port) => (port).PublicPort)
          .map((port) => `${port.IP}/${port.PublicPort}/${port.Type}`)
          .reduce((containerPorts: string[], containerPort:string) => [...containerPorts, containerPort], []),
      ], []).sort();
  }

  async Info(instance: InstanceEntity) {
    return this.getClientFromInstance(instance).client.info();
  }

  GetOrStartClient(InstanceName: string, options: Docker.DockerOptions): DockerInstance {
    let dockerClient: DockerInstance = (this.dockers.find((d) => d.InstanceName === InstanceName));
    if (!dockerClient) {
      dockerClient = {
        InstanceName,
        client: new Docker(options),
      };
      this.dockers.push(dockerClient);
    }
    return dockerClient;
  }

  GetOrStartClientFromInstance(instance: InstanceEntity): string {
    const instanceName: string = instance.id;
    this.GetOrStartClient(instanceName, {
      protocol: instance.protocol,
      host: instance.host,
      port: instance.port,
    });
    return instanceName;
  }

  getName(serverId: string): string {
    return `server_${serverId}`;
  }

  async CreateContainer(currentServer: ServerEntity): Promise<Docker.Container> {
    const instanceName: string = currentServer.instance.id;
    const instance = this.GetOrStartClient(instanceName, {
      protocol: currentServer.instance.protocol,
      host: currentServer.instance.host,
      port: currentServer.instance.port,
    });

    const images = await instance.client.listImages();
    const image = images.find((i) => i.RepoTags.includes(currentServer.image.imageName));
    if (!image) {
      await new Promise(async (resolve, reject) => {
        const msg = await instance.client.pull(currentServer.image.imageName) as IncomingMessage;
        msg.resume();
        msg.on('end', () => {
          if (!msg.complete) reject(new Error('The connection was terminated while the message was still being sent'));
          resolve(msg);
        });
      });
    }

    // console.log(currentServer.image.imageName, image);
    // console.log(image);
    // console.log(gotImage);
    // const serverProto = `${currentServer.image.serverPort}`;
    // const serverPortAndProto = `${currentServer.image.serverPort}/${serverProto}`;
    // const externalServerPortAndProto = `${currentServer.serverPort.externalPort}/${serverProto}`;

    const containterConfig: Docker.ContainerCreateOptions = {

      // Hostname?: string | undefined;
      // Domainname?: string | undefined;
      // User?: string | undefined;
      // AttachStdin?: boolean | undefined;
      // AttachStdout?: boolean | undefined;
      // AttachStderr?: boolean | undefined;
      // Tty?: boolean | undefined;
      // OpenStdin?: boolean | undefined;
      // StdinOnce?: boolean | undefined;
      // Env?: string[] | undefined;
      // Cmd?: string[] | undefined;
      // Entrypoint?: string | string[] | undefined;
      // Image?: string | undefined;
      // Labels?: { [label: string]: string } | undefined;
      // Volumes?: { [volume: string]: {} } | undefined;
      // WorkingDir?: string | undefined;
      // NetworkDisabled?: boolean | undefined;
      // MacAddress?: boolean | undefined;
      // ExposedPorts?: { [port: string]: {} } | undefined;
      // StopSignal?: string | undefined;
      // StopTimeout?: number | undefined;
      // HostConfig?: HostConfig | undefined;
      // NetworkingConfig?: {
      //   EndpointsConfig? : EndpointsConfig | undefined;
      // };

      Tty: true,
      name: this.getName(currentServer.id),
      Image: currentServer.image.imageName,
      Env: currentServer.image.imageType.envs.map((env) => `${env.name}=${env.value}`),
      ExposedPorts: { [currentServer.image.serverPort]: {} },
      HostConfig: {
        AutoRemove: true,
        Binds: currentServer.image.imageType.mounts.map((mp) => `${currentServer.instance.baseMountPath}${mp.internalPath}:${mp.hostPath}`),
        PortBindings: {
          [currentServer.image.serverPort]: [{ HostPort: currentServer.serverPort.toString() }],
        },
      },
    };

    if (currentServer.cmd) {
      containterConfig.Cmd = currentServer.cmd.split(' ');
    }

    console.log(util.inspect(containterConfig));

    if (currentServer.managePort) {
      // const manageProto = currentServer.image.managePortProto;
      // const managePortAndProto = `${currentServer.image.managePort}/${manageProto}`;
      // const externalManagePortAndProto = `${currentServer.managePort.externalPort}/${manageProto}`;
      containterConfig.ExposedPorts[currentServer.image.managePort] = {};
      containterConfig.HostConfig.PortBindings[currentServer.image.managePort] = [{
        HostPort: currentServer.managePort.toString(),
      }];
    }

    return instance.client.createContainer(containterConfig);
  }
}
