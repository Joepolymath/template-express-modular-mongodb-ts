import { Document, FilterQuery, Model, Types } from 'mongoose';

export class DAL<T extends Document> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(payload: Partial<T>) {
    return await new this.model(payload);
  }

  public async save(instance: Partial<T>) {
    return await instance.save();
  }

  public async findAll(
    query: FilterQuery<T>,
    populateData?: string[],
    selectData?: string
  ) {
    if (!populateData) {
      populateData = ['', ''];
    }
    if (!selectData) {
      selectData = '';
    }
    return await this.model
      .find(query)
      .populate(populateData[0], populateData[1])
      .select(selectData);
  }

  public async findOne(
    query: FilterQuery<T>,
    populateData?: string[],
    selectData?: string
  ) {
    if (!populateData) {
      populateData = ['', ''];
    }
    if (!selectData) {
      selectData = '';
    }
    return await this.model
      .findOne(query)
      .populate(populateData[0], populateData[1])
      .select(selectData);
  }

  public async findAndUpdate(
    query: FilterQuery<T>,
    update: Partial<T>,
    options: { new: boolean } = { new: true }
  ) {
    return await this.model.findOneAndUpdate(query, update, options);
  }

  public async findByIdAndDelete(id: Types.ObjectId) {
    return await this.model.findByIdAndDelete(id);
  }
}
