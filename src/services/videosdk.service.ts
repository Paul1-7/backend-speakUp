import axios from "axios";
import { CONFIG } from "~/config/config";

export default class VideoSdkService {
  static async createRoom(): Promise<string> {
    const options = {
      method: "POST",
      headers: {
        Authorization: CONFIG.SDK_TOKEN,
        "Content-Type": "application/json",
      },
      data: {
        region: "sg001",
        autoCloseConfig: {
          type: "session-end-and-deactivate",
          duration: 3,
        },
      },
      url: "https://api.videosdk.live/v2/rooms",
    };

    try {
      const response = await axios(options);
      const roomId = response.data.roomId;
      return roomId;
    } catch (error) {
      throw error;
    }
  }
}
