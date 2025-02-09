var nodeRef = siteService.getSite("Site2bDeleted");

var testingFolder = userhome.childByNamePath("User Homes/");

var nodeRef = siteService.getSite(shortName);
var nodeRef2 = nodeRef.getNode().getNodeRef().toString();

var foundIt = search.findNode(nodeRef2);

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
     if(currNode.isDocument) return removeNode(currNode);

     //  Check whether node is folder
     if (currNode.isContainer) {

         var nodes = currNode.children;
         for (var i=0; i<nodes.length; i++) {

             if(nodes[i].isDocument) removeNode(nodes[i]);
             else if (nodes[i].isContainer) getNodeList(nodes[i]);

         }// end for
     }// end if

     return true;
}



try {

    var currNode = companyhome.findNode(nodeRef);
    getNodeListandDelete(currNode);

}

catch(err) {
logger.log("Exception: " + err.message );
}
