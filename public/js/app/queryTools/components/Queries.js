import React from 'react';
import lo from 'lodash';
import sa from 'superagent';
import {Treebeard} from 'react-treebeard';
/*const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent'
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};*/

class Elem extends React.Component {
	constructor() {
        super();
        sa.get('./api/config/query')
        .end((err, res) => {
            this.setState((state, props) => {
                return {
                    data: queryToNode(res.body)
                };
            });
        });

        this.state = {cursor: null, data: []};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled) {
        const {cursor} = this.state;
        if (node.children) {
            node.toggled = toggled;
        	this.setState({fakeCursor: node});
        }
        else{
			if (cursor) {
	            cursor.active = false;
	        }
            var {setSelectedQuery} = this.props;

	        node.active = true;
            setSelectedQuery(node.bound.filePath);
        	this.setState({cursor: node, fakeCursor: node});
        }
    }
  	render() {
	  	var {config, filter,
			setSelectedQuery} = this.props;

	    return (
	      	<Treebeard data={this.state.data}
	      		onToggle={this.onToggle}/>
	    );
  	}
};

var queryToNode = queries => {
    return lo.map(queries, k=> {
        if(!k.children){
            return {
                name: k.fileName,
                bound: k
            };
        }
        else{
            return {
                name: k.fileName,
                toggled: false,
                children: queryToNode(k.children)
            };
        }
    });
};

export default Elem;