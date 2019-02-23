import React, { Component } from 'react';
import PostItem from './PostItem';
import { List, AutoSizer, CellMeasurer } from 'react-virtualized';
import './PostList.css';


class PostList extends Component {

    

    
    // state = {
    //     listHeight: 1000,
    //     listRowHeight: 830,
    //     listRowWidth: 1000,
    //     rowCount: this.props.posts.length
    // }


    // rowRenderer =  ({ index, style, key }) => {
    //     return (
    //         <div style={style} key={key}>
    //             <PostItem post={this.props.posts[index]} />
    //         </div>
    //     );
    // }


    // render() {
    //     return (
    //         <div className="ui container">
    //             <div id="postListContainer" className="ui relaxed list" >
    //                     <List 
    //                         width={this.state.listRowWidth}
    //                         height={this.state.listHeight}
    //                         rowHeight={this.state.listRowHeight}
    //                         rowRenderer={this.rowRenderer}
    //                         rowCount={this.state.rowCount}
    //                         posts={this.props.posts}
    //                         style={{margin: "auto"}}
    //                     />   
    //             </div>
    //         </div>
    //         );
    //     }
    // }




    renderPosts() {
        return this.props.posts.map(post => {
            return (
                <PostItem key={post._id} post={post}/>
            );
        });
    }

    render() {
        console.log(this.props.posts);
        return (
            <div className="ui container">
                <div id="postListContainer" className="ui relaxed list" >
                    {this.renderPosts()}
                </div>
            </div>
            );
        }
    }





export default (PostList);