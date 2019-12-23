import axios from 'axios';

let baseUrl = 'https://hatbazaruk.herokuapp.com';

let commands = {};

commands['getAllProducts'] = { url: `/products/`, method: 'GET', responseType: 'json' };

export const callApi = (command, data, pathPara, cb) => {
    let callback = cb,
        url = baseUrl + commands[command].url;

    if (typeof data === 'function') {
        callback = data;
    } else if (typeof pathPara === 'function') {
        callback = pathPara;
    } else {
        for (let field in pathPara) {
            url = baseUrl + commands[command].url.replace(':' + field, pathPara[field]);
        }
    }

    if (typeof commands[command] === 'undefined') {
        console.log(`command: ${command} not exists`);
        return callback('command not exists', null);
    }

    // TODO: handle user access control
    // if (typeof commands[command].userLevel !== 'undefined' && sessionInfo().userLevel < commands[command].userLevel) {
    //     console.warn(`user needs userLevel: ${commands[command].userLevel} has ${sessionInfo().userLevel}`);
    //     // alert('No access !');
    //     return callback('noAccess', null, null);
    // }

    // if ((commands[command].method === 'GET' || commands[command].method === 'DELETE') && data) {
    //     url += '?';
    //     for (let field in data) {
    //         url += `${field}=${data[field]}&`;
    //     }
    //     url = url.substring(0, url.length - 1);
    //     data = null;
    // }

    const header =  null,
        para = {
            url: url,
            method: commands[command].method,
            data: data,
            responseType: (commands[command].responseType) ? commands[command].responseType : 'json',
            validateStatus: null
        };

    if (header) {
        para['headers'] = header;
    }
    // console.log(para);
    axios(para)
        .then(res => {
            // console.log(res);
            if (res.status === 200) {
                callback(null, res.data, res.status);
            } else if (res.status === 400) {
                callback(res.data, null, res.status);
            } else if (res.status === 403) {
                console.log('not authorised');
                // window.location.href = '#/logout';
                // authLogout();
            } else if (res.status === 406) {
                callback(res.data, null, res.status);
            } else if (res.status === 404) {
                callback('route not exists', null, res.status);
            } else {
                callback(null, res.data, res.status);
            }
        })
        .catch(error => {
            return callback(error, null, null);
        })


};