import { ethers } from "ethers";
import IdentityManagement from "../contracts/IdentityManagement.json";

export const checkRegistration = async (signer: ethers.Signer): Promise<boolean> => {
  const identityManagementAddress = "0x266f2bE7076aE52bFB8f30c10AE577055c71DA63";
  const contract = new ethers.Contract(identityManagementAddress, IdentityManagement.abi, signer);

  try {
    const address = await signer.getAddress();
    console.log("Address retrieved: ", address);

    const sid = await contract.getSid(address);
    console.log("SID retrieved: ", sid);

    return sid !== 0n; // Returns true if the user is registered
  } catch (err) {
    console.error("Failed to fetch SID: ", err);
    return false;
  }
};
