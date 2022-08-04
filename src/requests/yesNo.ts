import axios from "axios";

interface YesNoResponse {
  answer: "yes" | "no" | "maybe";
  forced: boolean;
  image: string;
}

async function getYesNoResponse() {
  try {
    const response = await axios.get("https://yesno.wtf/api");
    return response.data as YesNoResponse;
  } catch (error) {
    console.error(error);
  }
}

async function repeatRequest(repeatCount: number) {
  const requests = [];
  for (let i = 0; i < repeatCount; i++) {
    requests.push(getYesNoResponse());
  }
  const responses: YesNoResponse[] = await Promise.all(requests);
  const positiveResponses = responses.filter(
    (response) => response.answer === "yes"
  );
  return positiveResponses.length;
}

export default repeatRequest;
