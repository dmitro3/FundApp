// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract FundraisingPlatform {
    uint public projectCount = 0;
    mapping(uint => Project) public projects;

    struct Project {
        uint id;
        string imageHash;
        string title;
        string description;
        uint collectedAmount;
        uint needToCollect;
        address author;
    }

    event ProjectCreated (
        uint id,
        string imageHash,
        string title,
        string description,
        uint collectedAmount,
        uint needToCollect,
        address author
    );

    event ProjectTipped(
        uint id,
        string imageHash,
        string title,
        string description,
        uint collectedAmount,
        uint needToCollect,
        address author
    );

    constructor() {}

    function uploadProject(string memory _imageHash, string memory _title, uint _needToCollect, string memory _description) public {
        require(_needToCollect > 0);
        require(bytes(_imageHash).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender!= address(0));

        projectCount++;
        projects[projectCount] = Project(projectCount, _imageHash, _title, _description, 0, _needToCollect, msg.sender);
        emit ProjectCreated(projectCount, _imageHash, _title, _description, 0, _needToCollect, msg.sender);
    }

    function donateToProject(uint _id) public payable {
        require(_id > 0 && _id <=projectCount);
        Project memory _project = projects[_id];
        address _author = _project.author;
        payable(_author).transfer(msg.value);
        _project.collectedAmount = _project.collectedAmount + msg.value;
        projects[_id] = _project;
        emit ProjectTipped(_id, _project.imageHash, _project.title, _project.description, _project.collectedAmount, _project.needToCollect, _author);
    }
}
