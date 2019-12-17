import axios from '../axiosCreator';

const DAILY_LOG_TASK_API = 'log-task/daily';
const MONTHLY_LOG_TASK_API = 'log-task/monthly';
const GET_LOG_TASK_API = 'log-task';

export async function statisticDailyLogTask(date) {
    const params = {};

    if(date !== undefined) {
        params.date = date;
    }
    console.log("params: ", params)

    return await axios.get(DAILY_LOG_TASK_API, {
        params,
    });
}

export async function statisticMonthlyLogTask(startDate, endDate)  {
    const params = {}
    if(startDate !== undefined) {
        params.startDate = startDate;
    }
    if(endDate !== undefined) {
        params.endDate = endDate;
    }

    return await axios.get(MONTHLY_LOG_TASK_API, {
        params,
    });
}

export async function getLogTask(listParams) {
    const params = {
        pageNum: listParams.pageNum === undefined ? 1 : parseInt(listParams.pageNum),
        limit: listParams.limit === undefined ? 20 : parseInt(listParams.limit),
    };
    if(listParams.type !== undefined) {
        params.taskType = listParams.type;
    }
    if(listParams.action !== undefined) {
        params.action = listParams.action;
    }
    if(listParams.startDate !== undefined)  {
        params.startDate = listParams.startDate;
    }
    if(listParams.endDate !== undefined)  {
        params.endDate = listParams.endDate;
    }

    return await axios.get(GET_LOG_TASK_API, {
        params,
    });
}
