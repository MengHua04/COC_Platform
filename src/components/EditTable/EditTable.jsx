import * as React from "react";
import { Input, Table } from "antd";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";

function EditableTable (props) {
    const {
        dataSource = [],
    } = props;

    const [tableData, setTableData] = useState(dataSource);

    useEffect(() => {
        // Set totals on initial render
        const newData = [...tableData];
        for (let index = 0; index < tableData.length; index++) {
            setTotal(newData, index);
        }
        setTableData(newData);
    }, []);

    const onInputChange = (key, index) => (e) => {
        const newData = [...tableData];
        newData[index][key] = Number(e.target.value);
        setTotal(newData, index);
        setTableData(newData);
    };

    const setTotal = (data, index) => {
        if(data[index]["occupationPoint"] == undefined) {
            data[index]["rateSuccess"] = parseInt(data[index]["initial"])
        } else {
            data[index]["rateSuccess"] = Number(
                parseInt(data[index]["initial"]) + data[index]["occupationPoint"]
            );
        }
    };

    const columns = [
        {
            dataIndex: "label",
            title: "技能名称",
            align: 'center'
        },
        {
            dataIndex: "initial",
            title: "初始值",
            align: 'center'
        },
        {
            dataIndex: "occupationPoint",
            title: "职业加点",
            align: 'center',
            render: (text, record, index) => (
                <Input value={text} min={0} max={99} onChange={onInputChange("occupationPoint", index)} />
            )
        },
        {
            dataIndex: "rateSuccess",
            title: "成功率",
            align: 'center',
            render: (text, record, index) => <h4>{text}</h4>
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={tableData}
                bordered={true}
                pagination={false}
                scroll={{ y: 260 }}
            />
        </div>
    );
};

export default EditableTable
