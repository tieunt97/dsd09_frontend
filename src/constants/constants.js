export const BASE_URL_LOG_SERVICE = "http://localhost:8000/api/v1"

export const LOG_ACTIONS = {
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  GET: 'GET',
};

export const TASK_TYPE = {
  PROJECT_TASK: 'PROJECT_TASK',
  PROCEDURE_TASK: 'PROCEDURE_TASK',
  RECURRENT_TASK: 'RECURRENT_TASK',
};

export const userRoles = {
  ADMIN: {
    name: 'Quản trị viên',
    key: 'ADMIN',
  },
  CEO: {
    name: 'Tổng giám đốc',
    key: 'CEO',
  },
  PERSONEL_MANAGER: {
    name: 'Trưởng phòng nhân sự',
    key: 'PERSONEL_MANAGER',
  },
  MARKETING_MANAGER: {
    name: 'Trưởng phòng tiếp thị',
    key: 'MARKETING_MANAGER',
  },
  FINANCE_MANAGER: {
    name: 'Trưởng phòng tài chính',
    key: 'FINANCE_MANAGER',
  },
  ACCOUNTING_MANAGER: {
    name: 'Trưởng phòng kế toán',
    key: 'ACCOUNTING_MANAGER',
  },
  PRODUCTION_MANAGER: {
    name: 'Trưởng phòng sản xuất',
    key: 'PRODUCTION_MANAGER',
  },
  STAFF: {
    name: 'Nhân viên',
    key: 'STAFF',
  },
};

// Successful
export const LOG_DEPARTMENT = {
  CREATE: "CREATE",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
}

export const LOG_STATUS = {
  SUCCESSFUL: "SUCCESSFUL",
  FAILURE: "FAILURE",
}

export const STATISTIC_DEPRTMENT_TYPE = {
  1: "Theo ngày",
  2: "Theo tháng",
  3: "Theo năm",
  4: "Theo trạng thái",
  5: "Theo action & ngày",
  6: "Theo action & tháng",
  7: "Theo action & năm",
}
