export async function submitDemo(data) {
    return new Promise((resolve) => {
        console.log("SEND TO API:", data);
        setTimeout(resolve, 1000);
    });
}
