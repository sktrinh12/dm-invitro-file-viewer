from app.sql import field_names
from app import config, oracle, utils
from fastapi.responses import StreamingResponse
from io import BytesIO

logger = utils.get_logger(__name__)


def extract_data(output, **kwargs):
    print(output)
    if kwargs['blob']:
        memfile = BytesIO(output[0][0].read())
        response = StreamingResponse(memfile, media_type="application/x-www-form-urlencoded")
        response.headers["Content-Disposition"] = f"inline; filename={kwargs['file_name']}"
        return response
    else:
        output_lst = []
        for i, r in enumerate(output):
            output_dct = {}
            output_dct['ID'] = i
            for j, n in enumerate(field_names):
                output_dct[n] = r[j]
            output_lst.append(output_dct)
        return output_lst


def oracle_query(sql_stmt: str, settings, **kwargs):
    try:
        with oracle.OracleConnection(settings.oracle_username,
                                     settings.oracle_password,
                                     settings.oracle_host,
                                     settings.oracle_port,
                                     settings.oracle_sid) as con:
            with con.cursor() as cursor:
                cursor.execute(sql_stmt)
                output = cursor.fetchall()
            rtn = extract_data(output, **kwargs)
            return rtn
    except Exception as e:
        msg = f"error running sql query ###\n{sql_stmt}\n#######\n{e}"
        logger.exception(msg)
        print(msg)
        return {"ERROR": msg}
