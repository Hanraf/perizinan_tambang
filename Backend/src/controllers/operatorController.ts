import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as operatorServices from '../services/operatorServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

// 🔹 CREATE
export const createOperator = async (req: Request, res: Response) => {
  try {
    const { nama_operator } = req.body;
    if (!nama_operator) return res.status(400).json({ message: 'Jenis izin required' });

    const results = await operatorServices.createOperatorService(nama_operator);
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(201).json(response);

  } catch (err) {
    console.error('Error inserting data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const getOperators = async (req: Request, res: Response) => {
  try {
    const results = await operatorServices.getOperatorsService();
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error fetching data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const getOperator = async (req: Request, res: Response) => {
  try {
    const { id_operator } = req.params
    const results = await operatorServices.getOperatorService( id_operator );
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error fetching data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const updateOperator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama_operator } = req.body;

    if (!nama_operator) return res.status(400).json({ message: 'Isi Nama Operator' });

    const results = (await operatorServices.updateOperatorService(id, nama_operator)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Jenis izin not found' });
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error updating data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const deleteOperator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await operatorServices.deleteOperatorService(id)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Jenis izin not found' });

    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error deleting data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};