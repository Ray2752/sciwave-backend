import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Language } from '../../languages/entities/language.entity';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @ManyToOne(() => Category, category => category.resources)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToOne(() => Language, language => language.resources)
  @JoinColumn({ name: 'language_id' })
  language!: Language;

  @Column({ nullable: true })
  source_url!: string;

  @Column({ default: 'draft' })
  status!: string;
}
