import { TransformationType } from 'class-transformer/enums';
import { TransformOptions } from 'class-transformer/metadata/ExposeExcludeOptions';

function Transform(transformFn: (value: any, obj: any, transformationType: TransformationType) => any, options?: TransformOptions): (target: any, key: string) => void;

function transformFn(value: any, obj: any, transformationType: TransformationType): any {
  console.log(value, obj, transformationType);
}

function Transform(transformFn: (value: any, obj: any, transformationType: TransformationType) => any, options?: TransformOptions): (target: any, key: string) => void;
