import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Language } from '../../languages/entities/language.entity';
import { Resource } from '../../resources/entities/resource.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  slug!: string;

  @ManyToOne(() => Language, language => language.categories)
  @JoinColumn({ name: 'language_id' })
  language!: Language;

  @OneToMany(() => Resource, resource => resource.category)
  resources!: Resource[];
}
