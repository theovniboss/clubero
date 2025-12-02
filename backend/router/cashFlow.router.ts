import express from "express";
import cashflowController from "../controllers/cashFlow.controller";
const cashFlowRouter = express.Router();

cashFlowRouter.get("/cashflow/categories/club/:clubId", cashflowController.getCashFlowCategories);
cashFlowRouter.post("/cashflow/category", cashflowController.createCashFlowCategory);
cashFlowRouter.put("/cashflow/category/:id", cashflowController.updateCashFlowCategory);
cashFlowRouter.delete("/cashflow/category/:id", cashflowController.deleteCashFlowCategory);

cashFlowRouter.get("/cashflow/club/:clubId", cashflowController.getCashFlows);
cashFlowRouter.get("/cashflow/:id", cashflowController.getCashFlow);
cashFlowRouter.post("/cashflow", cashflowController.createCashFlow);
cashFlowRouter.put("/cashflow/:id", cashflowController.updateCashFlow);
cashFlowRouter.delete("/cashflow/:id", cashflowController.deleteCashFlow);

export default cashFlowRouter;