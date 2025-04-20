// src/services/block.service.ts
import BlockModel from "../models/block.model";

export const getBlockByHash = async (hash: string) => {
  return await BlockModel.findOne({ hash });
};

export const getAllBlocks = async () => {
  return await BlockModel.find().sort({ height: -1 });
};

export const saveBlock = async (blockData: any) => {
  const block = new BlockModel(blockData);
  return await block.save();
};

