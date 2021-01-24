import React, { Component } from 'react';
import './CaptionBar.css'
class CaptionBar extends Component {
  render() {
    return (
        <div class="caption">
        <marquee class="GeneratedMarquee" direction="left" scrollamount="5" behavior="scroll">
             Abdulai Jalloh Devin Ramsammy Thierno Diallo
         </marquee>
     </div>
    );
  }
}

export default CaptionBar;