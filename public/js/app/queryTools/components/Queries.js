import React from 'react';
import lo from 'lodash';
import sa from 'superagent';
import {Treebeard} from 'react-treebeard';

class Elem extends React.Component {
	constructor(props) {
        super(props);
        /*sa.get('./api/config/query')
        .end((err, res) => {
            this.setState((state, props) => {
                return {
                    data: queryToNode(res.body)
                };
            });
        });*/
        var {config, request} = this.props;
        var cursorRef = null;
        var queryToNode = queryToNodeHandler(request.selectedQuery, 
            k=> { cursorRef = k; });
        this.state = {
            data: queryToNode(config.query),
            cursor: cursorRef,
            showData: []
        };
        
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
            setSelectedQuery(node.bound);
        	this.setState({cursor: node, fakeCursor: node});
        }
    }
  	render() {
	  	var {config, filter, request,
			setSelectedQuery} = this.props;

        var showData = [];
        if(request.selectedConnection){
            var selectedConnection = request.selectedConnection;
            showData = lo.filter(this.state.data,
                    k => !k.bound || k.bound.head.availableTo.indexOf(selectedConnection.driver) >= 0);
        }
	    return (
	      	<Treebeard data={showData}
	      		onToggle={this.onToggle}/>
	    );
  	}
};

var queryToNodeHandler = (selectedQuery, onFindNode) => {
    var queryToNode = (queries) => {
        return lo.map(queries, k=> {
            if(!k.children){
                var node = {
                    name: k.fileName,
                    bound: k,
                    active: selectedQuery.filePath == k.filePath
                };
                if(node.active){
                    onFindNode(node);
                }
                return node;
            }
            else{
                return {
                    name: k.fileName,
                    toggled: false,
                    children: queryToNode(k.children),
                    toggled: selectedQuery.filePath.startsWith(k.filePath)
                };
            }
        });
    };
    return queryToNode;
};

export default Elem;