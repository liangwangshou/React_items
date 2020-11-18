import axios from 'axios'
export default function ajax(url = '', data = {}, type = 'GET') {
    if (type === 'GET') {
        console.log(data);
        let dataStr = '';
        Object.keys(data).forEach((key) => { //把对象的属性整合为一个数组
            dataStr += key + '=' + data[key] + '&';
            console.log(data[key]);
        })
        if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.length - 1)
            url = url + '?' + dataStr;
        }
        console.log(dataStr);
        return axios.get(url)
    } else {
        return axios.post(url, data)
    }
}