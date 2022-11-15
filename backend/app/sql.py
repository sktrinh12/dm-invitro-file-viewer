sql_text_dct = {
    "fetch_mdata_base": """
select * from (
SELECT
    to_char(t0.experiment_id) experiment_id,
    SUBSTR(nvl(T2.BATCH_ID, t6.BATCH_ID), 1, 8) compound_id,
    NVL(T2.BATCH_ID, T6.BATCH_ID) BATCH_ID,
    t2.cro,
    t2.assay_type,
    t1.file_name,
    t1.doc_id,
    t1.extension
FROM
      ds3_userdata.tm_experiments t0
    INNER JOIN (SELECT ID, FILE_NAME, DOC_ID, EXTENSION FROM ds3_userdata.tm_template_dict) t1
    ON t0.experiment_id = t1.id
    INNER JOIN ds3_userdata.tm_protocol_props_pivot t2
    ON t0.experiment_id = t2.experiment_id
""",
    "fetch_mdata_combo_ds": """
    left join (select distinct batch_id,
                experiment_id
                from ds3_userdata.su_cellular_combo
                where batch_id != 'BLANK') t6
                ON t6.experiment_id = t0.experiment_id
                """,
    "fetch_mdata_cell_ds": """
    left join (select distinct batch_id,
                experiment_id from ds3_userdata.su_cellular_growth_drc
                where batch_id != 'BLANK') t6
                ON t6.experiment_id = t0.experiment_id
    """,
    "fetch_mdata_where":
    """
WHERE
    nvl(t0.deleted,'N') = 'N'
    AND t0.completed_date IS NOT NULL
    AND t0.protocol_id {0}
    and t2.assay_type in (SELECT prop_value
                        FROM ds3_userdata.TM_PROTOCOL_PROP_LOOKUP
                        WHERE PROP_TYPE = 'ASSAY_TYPE'
                        AND prop_group ='CELLULAR')
    and t1.extension in ('pptx', 'ppt', 'xlsx', 'xls')
)
WHERE COMPOUND_ID = '{1}'
ORDER BY EXPERIMENT_ID
""",
    "fetch_file": """
            SELECT DOC
            FROM ds3_userdata.tm_template_dict
            WHERE DOC_ID = '{0}'
            AND FILE_NAME = '{1}'
            AND ID = {2}
        """,
}

field_names = [
    "EXPERIMENT_ID",
    "COMPOUND_ID",
    "BATCH_ID",
    "CRO",
    "ASSAY_TYPE",
    "FILE_NAME",
    "DOC_ID",
    "EXTENSION",
]
