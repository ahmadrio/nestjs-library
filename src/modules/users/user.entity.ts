import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static async getAndSetPasswordAttribute(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }
}
