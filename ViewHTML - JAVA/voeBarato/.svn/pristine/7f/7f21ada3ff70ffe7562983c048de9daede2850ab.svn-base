package controller;

import java.util.Collection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>
 * Title: Assert
 * </p>
 * <p>
 * Description: Classe responsável por realizar verificação de objetos, como
 * null, vazio.
 * </p>
 * 
 * @version 1.0
 */
public final class Assert {

	final private static String ATOM = "[^\\x00-\\x1F^\\(^\\)^\\<^\\>^\\@^\\,^\\;^\\:^\\\\^\\\"^\\.^\\[^\\]^\\s]";
	final private static String DOMAIN = "(" + ATOM + "+(\\." + ATOM + "+)*";
	final private static String IP_DOMAIN = "\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\]";

	/**
	 * Construtor.
	 */
	private Assert() {
		super();
	}

	/**
	 * Verifica se value é uma String null ou vazia.
	 * 
	 * @param value
	 *            - value
	 * @return boolean - boolean
	 */
	public static boolean isNullAndEmpty(final String value) {
		return value == null || value.trim().equals("");
	}

	/**
	 * Verifica se value NÃO é uma String null ou vazia.
	 * 
	 * @param value
	 *            - value
	 * @return boolean - boolean
	 */
	public static boolean isNotNullAndEmpty(final String value) {
		return value != null && !value.trim().equals("");
	}

	/**
	 * Verifica se value NÃO é um objeto null ou vazio.
	 * 
	 * @param objeto
	 * @return boolean - boolean
	 */
	public static boolean isNotNullAndEmpty(final Object objeto) {
		if (objeto != null) {
			if (!objeto.toString().trim().equals("")) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Verifica se value NÃO é um Number null ou vazio.
	 * 
	 * @param value
	 *            - value
	 * @return boolean - boolean
	 */
	public static boolean isNotNullAndEmpty(final Number value) {
		return value != null && value.longValue() > 0;
	}

	/**
	 * Verifica se value é um Number null ou vazio.
	 * 
	 * @param value
	 *            - value
	 * @return boolean - boolean
	 */
	public static boolean isNullAndEmpty(final Number value) {
		return !isNotNullAndEmpty(value);
	}

	/**
	 * Verifica se a Collection é null ou vazia.
	 * 
	 * @param collection
	 *            - collection
	 * @return boolean - boolean
	 */
	public static boolean isEmptyList(final Collection<? extends Object> collection) {
		return collection == null || collection.isEmpty();
	}

	/**
	 * Verifica se a Collection não se encontra vazia.
	 * 
	 * @param collection
	 *            - collection
	 * @return boolean - boolean
	 */
	public static boolean isNotEmptyList(final Collection<? extends Object> collection) {
		return !isEmptyList(collection);
	}

	/**
	 * Verifica se a collection é null, vazia ou se possui apenas um registro de
	 * string vazio.
	 * 
	 * @param collection
	 *            para verificacao;
	 * @return true caso seja vazio, false caso contrário.
	 */
	public static boolean isListEmptyRegister(final Collection<String> collection) {
		boolean result = isEmptyList(collection);
		if (!result) {
			if (collection.size() == 1 && isNullAndEmpty(((List<String>) collection).get(0))) {
				result = true;
			} else {
				result = false;
			}
		}
		return result;
	}

	/**
	 * Verifica se o Object é null.
	 * 
	 * @param value
	 *            - value
	 * @return boolean - boolean
	 */
	public static boolean isNull(final Object value) {
		return value == null;
	}

	/**
	 * Verifica se o Object NÃO é null.
	 * 
	 * @param value
	 *            - value
	 * @return boolean - boolean
	 */
	public static boolean isNotNull(final Object value) {
		return !isNull(value);
	}

	public static boolean isNegativo(final Number value) {
		return isNotNull(value) && value.longValue() <= 0;
	}

	public static boolean isNegativo(final String value) {
		try {
			final Long parsed = Long.valueOf(value);
			return parsed < 0;
		} catch (final NumberFormatException exc) {
			return true;
		}
	}

	/**
	 * Verifica se a String NÃO é um numero.
	 * 
	 * @param value
	 *            - value
	 * @return boolean - boolean
	 */
	public static boolean isNotNumber(final String value) {
		try {
			Long.valueOf(value);
			return false;
		} catch (final NumberFormatException exc) {
			return true;
		}
	}

	/**
	 * Valida se a String informada é um email válido.
	 * 
	 * @param email
	 */
	public static boolean isValidEmail(final String email) {
		Pattern pattern = java.util.regex.Pattern.compile("^" + ATOM + "+(\\." + ATOM + "+)*@" + DOMAIN + "|"
				+ IP_DOMAIN + ")$", Pattern.CASE_INSENSITIVE);
		if (email == null || email.length() == 0) {
			return false;
		}
		Matcher m = pattern.matcher(email);
		return m.matches();
	}

	/**
	 * Valida se todos os argumentos são não-nulos.
	 * 
	 * @param objects
	 *            - Argumentos variáveis
	 * @return true/false
	 */
	public static boolean areAllArgsNotNull(final Object... objects) {
		for (Object object : objects) {
			if (object == null) {
				return false;
			}
		}
		return true;
	}
}
