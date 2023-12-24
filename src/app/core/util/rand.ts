export function generateRandomString(length: number): string {
    const charSet = "abcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for (let i = 0; i < length; i++) {
      res += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return res;
  }