import React from 'react';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';

function TabsDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Tabs activedName="tab2">
          <Tabs.Panel name="tab1" label="Tab 1">
            Tab Pane 1
          </Tabs.Panel>
          <Tabs.Panel name="tab2" label="Tab 2">
            Tab Pane 2
          </Tabs.Panel>
          <Tabs.Panel name="tab3" label="Tab 3">
            Tab Pane 3
          </Tabs.Panel>
        </Tabs>
      </div>
      <div className="demo-box">
        <Tabs>
          <Tabs.Panel name="tab1" label="Tab 1">
            Tab Pane 1
          </Tabs.Panel>
          <Tabs.Panel name="tab2" label="Tab 2" disabled={true}>
            Tab Pane 2
          </Tabs.Panel>
          <Tabs.Panel name="tab3" label="Tab 3">
            Tab Pane 3
          </Tabs.Panel>
        </Tabs>
      </div>
      <div className="demo-box">
        <Tabs>
          <Tabs.Panel name="tab1" label="Tab 1" icon="home">
            Tab Pane 1
          </Tabs.Panel>
          <Tabs.Panel name="tab2" label="Tab 2" icon="user">
            Tab Pane 2
          </Tabs.Panel>
          <Tabs.Panel
            name="tab3"
            label="Tab 3"
            icon="setting"
            iconPosition="right">
            Tab Pane 3
          </Tabs.Panel>
        </Tabs>
      </div>
      <div className="demo-box">
        <Tabs mode="row">
          <Tabs.Panel name="tab1" label="Tab 1" icon="home">
            Tab Pane 1
          </Tabs.Panel>
          <Tabs.Panel name="tab2" label="Tab 2" icon="user">
            Tab Pane 2
          </Tabs.Panel>
          <Tabs.Panel name="tab3" label="Tab 3" icon="setting">
            Tab Pane 3
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
}

export default TabsDemo;
