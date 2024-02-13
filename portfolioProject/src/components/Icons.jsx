import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faPlus, faBlog } from '@fortawesome/free-solid-svg-icons';
import { faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Style for all icons
const iconStyle = {
  color: '#ff4081', // Pink color
  fontSize: '2em'  // Twice the default font size
};

// Component for Folder icon
const FolderIcon = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faFolder} style={iconStyle} />
    </div>
  );
};

// Component for Add Folder button
const AddFolderButton = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faFolderPlus} style={iconStyle} />
    </div>
  );
};

// Component for Tools icon
const ToolsIcon = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faTools} style={iconStyle} />
    </div>
  );
};

// Component for Add Tools button
const AddToolsButton = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faPlus} style={iconStyle} /> <FontAwesomeIcon icon={faTools} style={iconStyle} />
    </div>
  );
};

// Component for Blogs icon
const BlogsIcon = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faBlog} style={iconStyle} />
    </div>
  );
};

// Component for Add Blog button
const AddBlogButton = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faPlus} style={iconStyle} /> <FontAwesomeIcon icon={faBlog} style={iconStyle} />
    </div>
  );
};

// Component for Sign Out button
const SignOutButton = ({ onClick }) => {
    return (
        <div>
            <FontAwesomeIcon icon={faSignOutAlt} onClick={onClick} style={iconStyle} />
        </div>
    );
};

// Export all components
export { FolderIcon, AddFolderButton, ToolsIcon, AddToolsButton, BlogsIcon, AddBlogButton, SignOutButton };
