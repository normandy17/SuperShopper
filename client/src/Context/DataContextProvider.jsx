import React, { Component } from "react"
import axios from "axios"
export const DataContext= React.createContext()


export class DataContextProvider extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            products:[],
            categories:[],
            isLoading:false,
            isLoaded:false,
            prsort:[],
            cart:[],
            isAuth:false,
            error:false
            
        }
        this.getProducts=this.getProducts.bind(this)
        this.getProductById=this.getProductById.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.handleLogout=this.handleLogout.bind(this)
       
       
    }


    getProducts(){
       
        const{isLoaded,products,prsort}=this.state
        if(!isLoaded){
             this.setState({
            isLoading:true
        })
        axios({
            url:"http://localhost:8001/products"
        }).then(res=>{
            var cat=[]
            for(var i=0;i<res.data.length;i++){
                var stat=true
                res.data[i].Image_Urls=res.data[i].Image_Urls.split("|")
                var temp= res.data[i].Offers.slice(0, -1)
                    res.data[i].Offers=Number(temp)
                for(var j=0;j<cat.length;j++){
                    if(res.data[i].Category!=cat[j])stat=true
                    else {
                        stat=false
                        break
                    }
                }
                if(stat==true)cat.push(res.data[i].Category)
            }
            this.setState({
                products:res.data,
                prsort:res.data
            })
            this.setState({
                categories:cat
            })
            
        }).then(()=>{
            this.setState({
                isLoading:false,
                isLoaded:true
            })
            
        })
    }
    
    }


    getProductById(id){
        const{products}=this.state
        const item=products.find((item) => item.UID==id)
        console.log(item)
        return item
    }

    handleAdd(product) {
        const { cart } = this.state
        var flag = false
        if (cart.length == 0) {
            product.quantity = 1

            this.setState({
                cart: [...cart, product]
            })
            flag=true

        }

        for (var i = 0; i < cart.length; i++) {
            if (product.Product_Title == cart[i].Product_Title) {
                flag = true
                cart[i].quantity++
                this.setState({
                    cart: [...cart]
                })
                break
            }


        }
        if (flag == false) {
            product.quantity = 1
            this.setState({
                cart: [...cart, product]
            })

        }
        console.log(cart)
    }

    handleLogin(email,password){
        console.log(email,password)
        
        this.setState({
            isLoading:true,
            error:false
        })
        axios({
            url:"https://reqres.in/api/login",
            method:"post",
            data:{email,password}
        }).then(res=>{
            this.setState({
                isAuth:true,
                isLoading:false,
                token:res.data.token,
                error:false
            })
        }).catch(err=>{
            this.setState({
                error:true,
                isLoading:false
            })
        })
    }

    handleLogout(){
        this.setState({
            isAuth:false
        },console.log("asdasdas",this.state.isAuth))
    }

    render(){
        const{products,isLoading,prsort,categories,cart,isAuth}=this.state
        const {getProductById,getProducts,handleAdd,handleLogin,handleLogout}=this
        const value={getProductById,getProducts,products,isLoading,prsort,categories,handleAdd,cart,handleLogin,handleLogout,isAuth}
        prsort.sort(function (a, b) { return b.Offers-a.Offers },console.log("s",prsort))
        return(
            <DataContext.Provider value={value}>{this.props.children}</DataContext.Provider>
        )
    }
}