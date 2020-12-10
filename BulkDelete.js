
var foundIt = search.findNode("workspace://SpacesStore/c2f64074-7a2a-46c6-b9fb-e5ff096d897f"); //2018-TOBEDELETED

logger.log("Bulk delete: " + foundIt);

logger.log("Node has associated nodes: " + foundIt.children.length);

// remove node
function removeNode(node) {
	var displayPath = node.displayPath;
	var nodeName = node.name;
	
	if(node.remove()){
        logger.log(displayPath + "/" + nodeName + " is deleted");
	}
	else {
        logger.log(displayPath + "/" + nodeName + " is NOT deleted");
	}
     return true;
}

//  List all the nodes under folder
function getNodeListandDelete(currNode) {

     //  Check whether node is document
	if(currNode.isDocument){ return removeNode(currNode);
						   }
     //  Check whether node is folder
     if (currNode.isContainer) {

         var nodes = currNode.children;
         for (var i=0; i<nodes.length; i++) {

			 if(nodes[i].isDocument){ removeNode(nodes[i]);
									}
            

         }// end for
     }// end if
	
	if (currNode.exists()) {removeNode(currNode);}

     return true;
}
try {

    
	if (foundIt.exists()) {
		getNodeListandDelete(foundIt);
	}

}

catch(err) {
logger.log("Exception: " + err.message );
}
