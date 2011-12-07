from devilry.rest.error import InvalidParameterTypeError

def subdict(dct, *keys):
    return dict((key, dct[key]) for key in keys)


def todict(obj, *attrs):
    return dict((attr, getattr(obj, attr)) for attr in attrs)



def force_paramtypes(**params):
    def check_types(func, params = params):
        def modified(*args, **kw):
            arg_names = func.func_code.co_varnames
            kw.update(zip(arg_names, args))
            for name, type in params.iteritems():
                param = kw[name]
                if param == None:
                    return
                elif not isinstance(param, type):
                    try:
                        kw[name] = type(param)
                    except:
                        raise InvalidParameterTypeError("Parameter '{0}' should be type '{1}'".format(name, type.__name__))
            return func(**kw)
        return modified
    return check_types