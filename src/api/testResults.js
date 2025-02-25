import MbtiApi from "../axios/MbtiApi";
import { QUERY_KEYS } from "../contansts/queryKeys";
import { ALERT_TYPE } from "../contansts/alertConstant";
import { alert } from "../utils/alert";

const { SUCCESS, ERROR } = ALERT_TYPE;
const alertConsole = alert();

export const getTestResults = async () => {
  try {
    const response = await MbtiApi.get(`/${QUERY_KEYS.RESULTS}`);
    return response.data;
  } catch (error) {
    console.log(error);
    alertConsole({
      type: ERROR,
      content: "불러오기에 실패하였습니다.",
    });
  }
};

export const createTestResult = async (resultData) => {
  try {
    const response = await MbtiApi.post(`/${QUERY_KEYS.RESULTS}`, resultData);
    return response.data;
  } catch (error) {
    console.log(error);
    alertConsole({
      type: ERROR,
      content: "정보 생성에 실패하였습니다.",
    });
  }
};

export const deleteTestResult = async (id) => {
  try {
    const response = await MbtiApi.delete(`/${QUERY_KEYS.RESULTS}/${id}`);
    if (response) {
      alertConsole({
        type: SUCCESS,
        content: "삭제가 완료되었습니다.",
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    alertConsole({
      type: ERROR,
      content: "삭제에 실패하였습니다.",
    });
  }
};

export const updateTestResultVisibility = async ({ id, visibility }) => {
  try {
    const response = await MbtiApi.patch(`/${QUERY_KEYS.RESULTS}/${id}`, {
      visibility,
    });
    if (response) {
      alertConsole({
        type: SUCCESS,
        content: "공개여부가 변경되었습니다.",
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    alertConsole({
      type: ERROR,
      content: "변경에 실패하였습니다.",
    });
  }
};
