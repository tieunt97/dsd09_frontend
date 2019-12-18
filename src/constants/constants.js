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
