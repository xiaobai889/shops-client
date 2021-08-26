import axios from 'axios'

export default function getData(weizhi, canshu = '') {
	return new Promise(function(resolve, reject) {
		let creURL
		let Npromise
		if ((typeof canshu) !== 'object') {
			if (canshu.indexOf('?') === 0) {
				creURL = `/api/${weizhi}${canshu}`
			} else {
				creURL = `/api/${weizhi}`
			}
			Npromise = axios.get(creURL)
		} else {
			creURL = `/api/${weizhi}`
			Npromise = axios.post(creURL, canshu)
		}
		Npromise.then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
