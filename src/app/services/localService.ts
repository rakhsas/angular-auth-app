import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
	providedIn: 'root',
})

export class localService {
	key = "123";
	constructor(){}
	public saveData(key:string, value:string)
	{
		localStorage.setItem(key, CryptoJS.AES.encrypt(value, this.key).toString());
	}
	public getData(key:string)
	{
		return CryptoJS.AES.decrypt(localStorage.getItem(key)!, this.key).toString(CryptoJS.enc.Utf8);
	}
	public removeData(key:string)
	{
		localStorage.removeItem(key);
	}
	public clearData()
	{
		localStorage.clear();
	}
}