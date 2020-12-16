import React, { Component } from 'react';
import './MemeGenerator.css'

class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //this.fetchMemes();
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ allMemeImgs: memes })
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault(); //stops the method from refreshing the page
        //Get random number to use as index with 'Math.floor(Math.random)'
        //Make sure the random index will be within 'allMemeImgs' indices by multiplying by the array's length
        const randIndex = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randMemeImg = this.state.allMemeImgs[randIndex].url; //Get random image from 'allMemeImgs' array.
                                                                   //Considered random because the index we are using was randomly generated
        this.setState({ randomImg: randMemeImg });
    }

    async fetchMemes() {
        const response = await fetch('https://api.imgflip.com/get_memes'); //return a promise
        const data = await response.json(); //turns the promise into a Javascript object
        const { memes } = data;
        this.setState({ allMemeImgs: memes });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{textAlign: "center"}}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Generate New Image</button>
                </form>
                <div className='container'>
                    <img src={this.state.randomImg} />
                    <h2 className='topText'>{this.state.topText}</h2>
                    <h2 className='bottomText'>{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;