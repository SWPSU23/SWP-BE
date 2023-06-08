const employeesModel = require("../models/employeesModel");

const createEmployeeDetail = (req, res) => {
  employeesModel.createEmployeeDetail(req.body)
    .then((data) => {
      res.status(200).send(
        {
          message: "Successfully created employee",
          data: data
        }
      );
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating employee",
        error: error.message
      });
    });
};

const getListEmployee = (req, res) => {
  employeesModel.getListEmployee()
    .then((data) => {
      res.status(200).send(
        {
          message: "Successfully get employee list",
          data: data
        }
      );
    })
    .catch((error) => {
      res.status(500).send(
        {
          message: "Error getting employee list",
          error: error.message
        }
      )
    });
};

const getEmployeeDetail = (req, res) => {
  employeesModel.getEmployeeDetail(req.params.id)
    .then((data) => {
      res.status(200).send(
        {
          message: "Get employee detail successfully",
          data: data
        }
      );
    })
    .catch((error) => {
      res.status(500).send(
        {
          message: "Error getting employee detail",
          error: error.message
        }
      );
    });
};

module.exports = { createEmployeeDetail, getListEmployee, getEmployeeDetail };
