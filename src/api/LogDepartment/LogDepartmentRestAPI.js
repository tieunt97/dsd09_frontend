import axios from '../axiosCreator';
import { BASE_URL_LOG_SERVICE } from '../../constants/constants';

const GET_DEPARTMENT_LIST = `${BASE_URL_LOG_SERVICE}/department/list`;
const LOG_DEPARTMENT_DAILY = `${BASE_URL_LOG_SERVICE}/department/day`;
const LOG_DEPARTMENT_MONTHLY = `${BASE_URL_LOG_SERVICE}/department/month`;
const LOG_DEPARTMENT_ANNUAL = `${BASE_URL_LOG_SERVICE}/department/year`;
const LOG_DEPARTMENT_BY_STATUS = `${BASE_URL_LOG_SERVICE}/department/status`;
const LOG_DEPARTMENT_BY_TYPE_DAILY = `${BASE_URL_LOG_SERVICE}/department/type/day`;
const LOG_DEPARTMENT_BY_TYPE_MONTHLY = `${BASE_URL_LOG_SERVICE}/department/type/month`;
const LOG_DEPARTMENT_BY_TYPE_ANNUAL = `${BASE_URL_LOG_SERVICE}/department/type/year`;

export async function getDepartmentList() {
    return await axios.get(GET_DEPARTMENT_LIST);
}

export async function statisticMemberGroupDay(params) {
    return await axios.get(LOG_DEPARTMENT_DAILY, {
        params,
    });
}

export async function statisicMemberGroupMonth(params) {
    return await axios.get(LOG_DEPARTMENT_MONTHLY, {
        params,
    });
}

export async function statisicMemberGroupYear(params) {
    return await axios.get(LOG_DEPARTMENT_ANNUAL, {
        params,
    });
}

export async function statisticMemberGroupStatus(params) {
    return await axios.get(LOG_DEPARTMENT_BY_STATUS, {
        params,
    });
}

export async function statisticMemberGroupDayType(params) {
    return await axios.get(LOG_DEPARTMENT_BY_TYPE_DAILY, {
        params,
    });
}

export async function statisicMemberGroupMonthType(params) {
    return await axios.get(LOG_DEPARTMENT_BY_TYPE_MONTHLY, {
        params,
    });
}

export async function statisicMemberGroupYearType(params) {
    return await axios.get(LOG_DEPARTMENT_BY_TYPE_ANNUAL, {
        params,
    });
}

// statisticMemberGroupDay,
//   statisicMemberGroupMonth,
//   statisicMemberGroupYear,
//   statisticMemberGroupStatus,
//   statisticMemberGroupType,
//   statisticMemberGroupDayType,
//   statisicMemberGroupMonthType,
//   statisicMemberGroupYearType,