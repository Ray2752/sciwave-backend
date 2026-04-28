import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Resource } from '../../resources/entities/resource.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 2 })
  code!: string;

  @Column()
  name!: string;

  @OneToMany(() => Category, category => category.language)
  categories!: Category[];

  @OneToMany(() => Resource, resource => resource.language)
  resources!: Resource[];
}
