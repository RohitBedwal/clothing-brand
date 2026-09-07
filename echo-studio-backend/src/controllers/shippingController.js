import { shippingService } from '../services/shippingService.js';

export const getMethods = async (req, res, next) => {
  try {
    const methods = shippingService.getMethods();
    res.json({ success: true, data: methods });
  } catch (error) {
    next(error);
  }
};

export const calculate = async (req, res, next) => {
  try {
    const { method, subtotal, items, address } = req.body;
    const result = shippingService.calculate({ method, subtotal, items, address });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
