import React from 'react';
import { Link } from 'react-router-dom';
import Select from './Select';

function SelectDemo() {
  const selectWidth = 180;
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Select
          width={selectWidth}
          placeholder="Label Options"
          clearable={true}
          onChange={console.log}>
          <Select.Option value="option1" label="Option1" />
          <Select.Option value="option2" label="Option2" />
          <Select.Option value="option3" label="Option3" />
          <Select.Option value="option4" label="Option4" disabled={true} />
        </Select>
        <Select
          width={selectWidth}
          placeholder="Children Options"
          onChange={console.log}>
          <Select.Option value="option1" icon="home">
            Option1
          </Select.Option>
          <Select.Option value="option2" icon="user">
            Option2
          </Select.Option>
          <Select.Option value="option3" icon="store">
            Option3
          </Select.Option>
          <Select.Option value="option4" icon="setting" disabled={true}>
            Option4
          </Select.Option>
        </Select>
        <Select
          width={selectWidth}
          disabled={true}
          placeholder="Disabled Select">
          <Select.Option value="option1" label="Option1" />
          <Select.Option value="option2" label="Option2" />
          <Select.Option value="option3" label="Option3" />
          <Select.Option value="option4" label="Option4" disabled={true} />
        </Select>
        <Select
          width={selectWidth}
          placeholder="Group Select"
          defaultValue="option1.1"
          onChange={console.log}>
          <Select.OptionGroup title="Group 1">
            <Select.Option value="option1.1">Group Item 1.1</Select.Option>
            <Select.Option value="option1.2">Group Item 1.2</Select.Option>
            <Select.Option value="option1.3">Group Item 1.3</Select.Option>
            <Select.Option value="option1.4" disabled={true}>
              Group Item 1.4
            </Select.Option>
          </Select.OptionGroup>
          <Select.OptionGroup title="Group 2">
            <Select.Option value="option2.1">Group Item 2.1</Select.Option>
            <Select.Option value="option2.2">Group Item 2.2</Select.Option>
            <Select.Option value="option2.3">Group Item 2.3</Select.Option>
            <Select.Option value="option2.4">Group Item 2.4</Select.Option>
          </Select.OptionGroup>
        </Select>
        <Select
          width={selectWidth}
          placeholder="Can Input"
          readOnly={false}
          onChange={console.log}>
          <Select.Option value="option1" label="Option1" />
          <Select.Option value="option2" label="Option2" />
          <Select.Option value="option3" label="Option3" />
          <Select.Option value="option4" label="Option4" />
        </Select>
      </div>
      <div className="demo-box">
        <Select
          width={selectWidth}
          defaultValue="option1"
          size="small"
          onChange={console.log}>
          <Select.Option value="option1" label="Option1" />
          <Select.Option value="option2" label="Option2" />
          <Select.Option value="option3" label="Option3" />
          <Select.Option value="option4" label="Option4" disabled={true} />
        </Select>
        <Select
          width={selectWidth}
          defaultValue="option1"
          size="normal"
          onChange={console.log}>
          <Select.Option value="option1" label="Option1" />
          <Select.Option value="option2" label="Option2" />
          <Select.Option value="option3" label="Option3" />
          <Select.Option value="option4" label="Option4" disabled={true} />
        </Select>
        <Select
          width={selectWidth}
          defaultValue="option1"
          size="large"
          onChange={console.log}>
          <Select.Option value="option1" label="Option1" />
          <Select.Option value="option2" label="Option2" />
          <Select.Option value="option3" label="Option3" />
          <Select.Option value="option4" label="Option4" disabled={true} />
        </Select>
      </div>
      <div className="demo-box">
        <Select
          width={selectWidth}
          defaultValue="menu_item_1"
          onChange={console.log}>
          <Select.Option value="menu_item_1" label="Menu Item 1">
            <span style={{ float: 'left' }}>Menu Item 1</span>
            <span style={{ float: 'right', color: '#d9d9d9', fontSize: 12 }}>
              No.1
            </span>
          </Select.Option>
          <Select.Option value="menu_item_2" label="Menu Item 2">
            <span style={{ float: 'left' }}>Menu Item 2</span>
            <span style={{ float: 'right', color: '#d9d9d9', fontSize: 12 }}>
              No.2
            </span>
          </Select.Option>
          <Select.Option value="menu_item_3" label="Menu Item 3">
            <span style={{ float: 'left' }}>Menu Item 3</span>
            <span style={{ float: 'right', color: '#d9d9d9', fontSize: 12 }}>
              No.3
            </span>
          </Select.Option>
          <Select.Option value="menu_item_4" label="Menu Item 4">
            <span style={{ float: 'left' }}>Menu Item 4</span>
            <span style={{ float: 'right', color: '#d9d9d9', fontSize: 12 }}>
              No.4
            </span>
          </Select.Option>
        </Select>
      </div>
    </>
  );
}

export default SelectDemo;
