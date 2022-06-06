import React, { Component } from 'react';
import { Carousel } from 'antd';
import style from './Banner.module.less'

class Banner extends Component {
    constructor(props) {
        super(props);
        //react定义数据
        this.state = {
        }
    }
    render() {
        return (
            <Carousel autoplay className={style.slick_slide}>
                <div>
                    <h3 className={style.h3}><img className={style.img} src={require('../../asset/carousel/item1.jpg')}  alt="logo" /></h3>
                </div>
                <div>
                    <h3 className={style.h3}><img className={style.img} src={require('../../asset/carousel/item2.jpg')}  alt="logo" /></h3>
                </div>
                <div>
                    <h3 className={style.h3}><img className={style.img} src={require('../../asset/carousel/item3.jpg')}  alt="logo" /></h3>
                </div>
                <div>
                    <h3 className={style.h3}><img className={style.img} src={require('../../asset/carousel/item4.jpg')}  alt="logo" /></h3>
                </div>
            </Carousel>
        )
    }
}
export default Banner;