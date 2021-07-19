import { h, FunctionComponent, Fragment } from 'preact';

import { useDebugContext } from '../../context/DebugContext';
import { css } from '../../styles/css';
import QueryTableRow from './QueryTableRow';

const styles = css`
    width: 100%;
    margin-bottom: 4rem;

    th {
        font-weight: bold;
        font-size: 16px;
        padding: 1rem 0.5rem;
    }

    tr {
        font-size: 13px;
        margin-bottom: 0.5rem;

        &:last-child {
            border-bottom: none;
        }
    }

    td {
        padding: 0.5rem;
        border-bottom: 1px solid var(--colors-ContrastDark);
        vertical-align: top;
    }
`;

const tableNameStyle = css`
    td {
        border-top: 1px solid --var(--colors-ContrastDark);
        color: var(--colors-PrimaryBlue);
    }
`;

const QueryTable: FunctionComponent = () => {
    const {
        debugInfos: {
            sqlData: { groupedQueries },
        },
    } = useDebugContext();

    return (
        <table className={styles}>
            <thead>
                <tr>
                    <th>Query</th>
                    <th>Cumulative execution time</th>
                    <th>Execution count</th>
                    <th>Params</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(groupedQueries).map((tableName) => (
                    <>
                        <tr className={tableNameStyle}>
                            <td colSpan={4}>
                                <strong>{tableName}</strong>
                            </td>
                        </tr>
                        {Object.keys(groupedQueries[tableName]).map((sqlString) => (
                            <QueryTableRow
                                queryString={sqlString}
                                queryDetails={groupedQueries[tableName][sqlString]}
                            />
                        ))}
                    </>
                ))}
            </tbody>
        </table>
    );
};

export default QueryTable;
