import axios from '../axiosCreator';
import { BASE_URL_LOG_SERVICE } from '../../constants/constants';

const GET_LOG_REPORT_LIST = `${BASE_URL_LOG_SERVICE}/reports`;
const STATISTIC_REPORT_FOR_MONTH = `${BASE_URL_LOG_SERVICE}/reports/month`;
const STATISTIC_REPORT_FOR_DAY = `${BASE_URL_LOG_SERVICE}/reports/day`;
const STATISTIC_REPORT_FOR_YEAR = `${BASE_URL_LOG_SERVICE}/reports/year`;
const STATISTIC_REPORT_FOR_SERVICE = `${BASE_URL_LOG_SERVICE}/reports/service`;

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

export async function statisticReportForDay(startDate, endDate) {
  try {
    const params = {};

    if(startDate) {
      params.startDate = startDate;
    }
    if(endDate) {
      params.endDate = endDate;
    }

    const response = await axios.get(STATISTIC_REPORT_FOR_DAY, {
      params,
    });
    console.log('response', response);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function statisticReportForYear(startDate, endDate) {
  try {
    const params = {};

    if(startDate) {
      params.startDate = startDate;
    }
    if(endDate) {
      params.endDate = endDate;
    }

    const response = await axios.get(STATISTIC_REPORT_FOR_YEAR, {
      params,
    });
    console.log('response', response);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function statisticReportForService() {
  try {
    const params = {};

    const response = await axios.get(STATISTIC_REPORT_FOR_SERVICE, {
      params,
    });
    console.log('response', response);
    return response;
  } catch (error) {
    return error.response;
  }
}
