// window.addEventListener('' , checkstatus);

// function checkstatus(){
//     let online = navigator.onLine;
//  if(online === true){
//       let showOnline = document.querySelector('.online')
//     showOnline.classList.add('ntw-content-online-open');
//     setTimeout(()=>{
//         document.querySelector('.online').classList.remove('ntw-content-online-open');
//         checkstatus()
//     }, 8000)
//  }else if(online === false){
//     let showOffline = document.querySelector('.offline')
//     showOffline.classList.add('ntw-content-offline-open');
//     setTimeout(()=>{
//         document.querySelector('.offline').classList.remove('ntw-content-offline-open');
//         checkstatus()
//     }, 8000)
// }
// }
// checkstatus();

function checkstatus(){
    let networkSatus = navigator.onLine;
    if(networkSatus === true){
        let onlineStatus = document.querySelector('.status')
            onlineStatus.classList.add('ntw-content-online-open');
        let statusContent = document.querySelector('.i');
        statusContent.textContent = 'Online'
        statusContent.classList.add('ntw-content-online')
            setTimeout(()=>{
                // console.log("online")
                checkstatus()
            }, 2000)
    }else if(networkSatus === false){
            let offlineStatus = document.querySelector('.status')
            offlineStatus.classList.add('ntw-content-offline-open');
            let statusOffllineContent = document.querySelector('.i');
            statusOffllineContent.textContent = 'Offline'
            statusOffllineContent.classList.add('ntw-content-offline')
            setTimeout(()=>{
                // console.warn("NETWORK ERROR : BROWSER TRYING TO RECONNECT")
                statusOffllineContent.classList.remove('ntw-content-online')
                statusOffllineContent.classList.add('ntw-content-offline')
                checkstatus()
            }, 2000)
}
}
checkstatus();

