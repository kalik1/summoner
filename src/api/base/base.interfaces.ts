import { MyBaseEntity } from './entities/base.enitity_tmpl';

// 1 Transform the type to flag all the undesired keys as 'never'
type FlagExcludedType<Base, Type> = { [Key in keyof Base]: Base[Key] extends Type ? never : Key };

// 2 Get the keys that are not flagged as 'never'
type AllowedNames<Base, Type> = FlagExcludedType<Base, Type>[keyof Base];

// 3 Use this with a simple Pick to get the right interface, excluding the undesired type
type OmitType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>;

// 4 Exclude the Function type to only get properties
export type ConstructorType<T> = OmitType<T, (...args: unknown[]) => unknown>;

export type TReplaceBaseEntityWithStringsArrays<T> = {
  [K in keyof T]: [Extract<T[K], MyBaseEntity>] extends [never] ? T[K] : string;
};

export type EntityToDto<K> = TReplaceBaseEntityWithStringsArrays<ConstructorType<K>>;

type ConstructorTypeNoTs<K> = Omit<ConstructorType<K>, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type EntityToDtoNoIdAndTimeStamps<K> = TReplaceBaseEntityWithStringsArrays<ConstructorTypeNoTs<K>> & {
  id: never
  createdAt?: never
  updatedAt?: never
  deletedAt?: never
};
