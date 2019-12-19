import axios from '../axiosCreator';
import { BASE_URL_LOG_SERVICE } from '../../constants/constants';

const GET_LOG_REPORT_LIST = `${BASE_URL_LOG_SERVICE}/reports`;
const STATISTIC_REPORT_FOR_MONTH = `${BASE_URL_LOG_SERVICE}/reports/month`;
const LOG_DEPARTMENT_MONTHLY = `${BASE_URL_LOG_SERVICE}/department/month`;
const LOG_DEPARTMENT_ANNUAL = `${BASE_URL_LOG_SERVICE}/department/year`;
const LOG_DEPARTMENT_BY_STATUS = `${BASE_URL_LOG_SERVICE}/department/status`;
const LOG_DEPARTMENT_BY_TYPE_DAILY = `${BASE_URL_LOG_SERVICE}/department/type/day`;
const LOG_DEPARTMENT_BY_TYPE_MONTHLY = `${BASE_URL_LOG_SERVICE}/department/type/month`;
const LOG_DEPARTMENT_BY_TYPE_ANNUAL = `${BASE_URL_LOG_SERVICE}/department/type/year`;

export async function getLogReportList() {
  try {
    const params = {};
    const response = await axios.get(GET_LOG_REPORT_LIST, {
      params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function statisticReportForMonth(startDate, endDate) {
  try {
    const params = {};

    if(startDate) {
      params.startDate = startDate;
    }
    if(endDate) {
        params.endDate = endDate;
    }

    const response = await axios.get(STATISTIC_REPORT_FOR_MONTH, {
      params,
    });
    console.log('response', response);
    return response;
  } catch (error) {
    return error.response;
  }
}
