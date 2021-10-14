import { MyBaseEntity } from '../../api/base/entities/base.enitity_tmpl';

export function IdAssignerTransformer<K extends typeof MyBaseEntity>(Type: K) {
  return (obj: { value: string }) => {
    const { value } = obj;
    const imgEntity = new Type();
    imgEntity.id = value;
    return imgEntity;
  };
}
