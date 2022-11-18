import { Router } from "express";
import { UsersController } from "../controllers";
const usersRoute = Router();

usersRoute
  .get("/", UsersController.getAll.bind(UsersController))
  .get("/aprovacoes", UsersController.getApprovalList.bind(UsersController))
  .post("/", UsersController.create.bind(UsersController))
  .put("/:id", UsersController.update.bind(UsersController))
  .patch("/:id/aprovar", UsersController.approve.bind(UsersController))
  .patch(
    "/:id/alterarStatus",
    UsersController.updateStatus.bind(UsersController)
  )
  .patch("/:id/alterarTipo", UsersController.updateType.bind(UsersController));

export default usersRoute;
