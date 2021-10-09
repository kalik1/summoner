import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';
import { ServerEntity } from '../api/server/entities/server.entity';

interface DockerInstance {
  InstanceName: string;
  client: Docker
}

@Injectable()
export class DockerService {
  dockers: DockerInstance[];

  private getInstanceFromName(InstanceName: string): Docker {
    return this.dockers.find((d) => d.InstanceName === InstanceName).client;
  }

  StartContainer(InstanceName: string, containerId: string): Promise<unknown> {
    return this.getInstanceFromName(InstanceName).getContainer(containerId).start();
  }

  StopContainer(InstanceName: string, containerId: string): Promise<unknown> {
    return this.getInstanceFromName(InstanceName).getContainer(containerId).stop();
  }

  GetContainerStatus(InstanceName: string, containerId: string): Promise<Docker.ContainerStats> {
    return this.getInstanceFromName(InstanceName).getContainer(containerId).stats();
  }

  GetOrStartClient(InstanceName: string, options: Docker.DockerOptions): DockerInstance {
    let dockerClient: DockerInstance = (this.dockers.find((d) => d.InstanceName === InstanceName));
    if (!dockerClient) {
      dockerClient = {
        InstanceName,
        client: new Docker(options),
      };
    }
    return dockerClient;
  }

  CreateContainer(currentServer: ServerEntity): Promise<Docker.Container> {
    const instanceName: string = currentServer.instance.id;
    const instance = this.GetOrStartClient(instanceName, {
      protocol: currentServer.instance.protocol,
      host: currentServer.instance.host,
      port: currentServer.instance.port,
    });

    const serverProto = `${currentServer.image.serverPort}`;
    const serverPortAndProto = `${currentServer.image.serverPort}/${serverProto}`;
    const externalServerPortAndProto = `${currentServer.serverPort.externalPort}/${serverProto}`;

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

      name: `server_${currentServer.id}`,
      Image: currentServer.image.imageName,
      Env: currentServer.image.imageType.envs.map((env) => `${env.name}=${env.value}`),
      ExposedPorts: { [serverPortAndProto]: {} },
      HostConfig: {
        AutoRemove: true,
        Binds: currentServer.image.imageType.mounts.map((mp) => `${mp.internalPath}:${mp.hostPath}`),
        PortBindings: {
          [serverPortAndProto]: [{ HostPort: externalServerPortAndProto }],
        },
      },
    };

    if (currentServer.managePort) {
      const manageProto = currentServer.image.managePortProto;
      const managePortAndProto = `${currentServer.image.managePort}/${manageProto}`;
      const externalManagePortAndProto = `${currentServer.managePort.externalPort}/${manageProto}`;
      containterConfig.ExposedPorts[managePortAndProto] = { };
      containterConfig.HostConfig.PortBindings[managePortAndProto] = [{ HostPort: externalManagePortAndProto }];
    }

    return instance.client.createContainer(containterConfig);
  }
}
