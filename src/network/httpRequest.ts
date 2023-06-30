import axios from "axios";

export const getAuthCode = async () => {
  try {
    await axios({
      url: "https://anilist.co/api/v2/oauth/token",
      method: "POST",
      data: {
        json: {
          grant_type: "authorization_code",
          client_id: "13318",
          client_secret: "lyXtngVzwFvDUHqp7PHEh1w5hqNHrWnyfk7cgtFJ",
          redirect_uri: "http://localhost:3001",
          code: "def502004acef2a0af3caf29db06ced35c679c86afd207e75313696f31c07d4c9d3f7b7c7d58e12a90b286a6bd7c09486a5d8329b9f0f6b0259074a10da1c910c0cc6892d11c6582fa2f71d063eaad1b0ac58b9c9d22471d5f0dfffa73b1fc71775b42d878fe80f8fe07d730469581d142000e0ee88d062e1431fd6c14644b4019e3aa2892ed2b1cfbebea85e34b074dcc89832ea6c00e4242aadf69ceb9f4380f3b2ad2170efa4afa8cba6baea81cba99de16b53c28ae1b70d4d0ca32c6ea65edf380dcaaf8ac8a73df4d314a108ee8bd4d07e85f1f4a1c432215e00559f37cb280fa7bf1f7dcd9d02ddb5ee02c1c2de8f365c1963d33742f51eb9a992617b1c8537653a57625562afc8765597bd487e061d8b4bad32ece0471484ba21ef7033a75a177cb2d8d6b2d649888ffcdfae883424b6ae6419f5998a84695cfa2a74724b8b5d0e0df327c7fe777551e0585ac0f14cbff15da7edc87b8214edc19b68f",
        },
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
