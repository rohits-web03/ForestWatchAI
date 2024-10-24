import logging

def get_logger(name):
    logger = logging.getLogger(name)
    if not logger.hasHandlers():
        logger.setLevel(logging.INFO)
        handler = logging.StreamHandler()
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s [%(filename)s:%(lineno)d]')
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    logger.propagate = False
    return logger